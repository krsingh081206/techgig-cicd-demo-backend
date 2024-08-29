import OktaJwtVerifier from '@okta/jwt-verifier';
import oktaConfig from '../config/config.js';
import response from '../utils/response.js';
const oktaJwtVerifier = new OktaJwtVerifier({
	clientId: oktaConfig.resourceServer.oidc.clientId,
	issuer: oktaConfig.resourceServer.oidc.issuer,
	assertClaims: oktaConfig.resourceServer.assertClaims,
	testing: oktaConfig.resourceServer.oidc.testing
});
// Middleware to auth okta user
// It ensures every request in the route and checks for valid token
const oktaAuth = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || '';
		const match = authHeader.match(/Bearer (.+)/);
		if (!match) {
			return response.sendErrorResponse('OKTAVerification', res, 'Unauthorized',401);
		}
		const accessToken = match[1];
		const audience = oktaConfig.resourceServer.assertClaims.aud;
		return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
			.then((jwt) => {
				req.oktaUser = jwt.claims;
				next();
			})
			.catch((err) => {
				return response.sendErrorResponse('OKTAVerification', res, err.message,401);
			});
	} catch (err) {
		return response.sendErrorResponse('OKTAVerification', res, 'Unexpected error occurred',500);
	}
};
export default oktaAuth;

