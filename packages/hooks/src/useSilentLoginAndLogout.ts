import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { useStore } from '@deriv/stores';
import { requestOidcAuthentication } from '@deriv-com/auth-client';

import useTMB from './useTMB';
/**
 * Handles silent login and single logout logic for OAuth2.
 *
 * @param {{
 *   is_client_store_initialized: boolean; // Whether the client store has been initialized
 *   oAuthLogout: () => Promise<void>; // Function to handle OAuth2 logout
 * }} params - The arguments required for silent login and logout management
 */
const useSilentLoginAndLogout = ({
    is_client_store_initialized,
    oAuthLogout,
}: {
    is_client_store_initialized: boolean;
    oAuthLogout: () => Promise<void>;
}) => {
    const is_deriv_com = /deriv\.(com)/.test(window.location.hostname) || /localhost:8443/.test(window.location.host);
    const loggedState = Cookies.get('logged_state');

    const { client } = useStore();
    const clientAccounts = JSON.parse(localStorage.getItem('client.accounts') || '{}');
    const clientTokens = JSON.parse(localStorage.getItem('config.tokens') || '{}');
    const isClientAccountsPopulated = Object.keys(clientAccounts).length > 0;
    const isClientTokensPopulated = Object.keys(clientTokens).length > 0;
    const isSilentLoginExcluded =
        window.location.pathname.includes('callback') || window.location.pathname.includes('endpoint');

    // state to manage and ensure OIDC callback functions are invoked once only
    const isAuthenticating = useRef(false);
    const isLoggingOut = useRef(false);
    const { prevent_single_login, setIsSingleLoggingIn: setClientIsSingleLoggingIn } = client;
    const { isTmbEnabled } = useTMB();

    useEffect(() => {
        const renderSLO = async () => {
            const is_tmb_enabled = await isTmbEnabled();
            const willEventuallySSO = loggedState === 'true' && !isClientAccountsPopulated && !isClientTokensPopulated;
            const willEventuallySLO = loggedState === 'false' && isClientAccountsPopulated && !isClientTokensPopulated;
            if ((willEventuallySSO || willEventuallySLO) && !isSilentLoginExcluded && !is_tmb_enabled) {
                setClientIsSingleLoggingIn(true);
            } else {
                setClientIsSingleLoggingIn(false);
            }
        };
        renderSLO();
    }, [isClientAccountsPopulated, isClientTokensPopulated, loggedState]);

    const requestOidcLogin = async () => {
        try {
            await requestOidcAuthentication({
                redirectCallbackUri: `${window.location.origin}/callback`,
                postLoginRedirectUri: window.location.href,
            }).catch(err => {
                setClientIsSingleLoggingIn(false);
                // eslint-disable-next-line no-console
                console.error(err);
            });
        } catch (err) {
            setClientIsSingleLoggingIn(false);
            // eslint-disable-next-line no-console
            console.error(err);
        }
    };

    useEffect(() => {
        const renderSilentLoginAndLogout = async () => {
            const is_tmb_enabled = await isTmbEnabled();
            if (
                prevent_single_login ||
                !is_client_store_initialized ||
                isSilentLoginExcluded ||
                !is_deriv_com ||
                is_tmb_enabled
            )
                return;

            // NOTE: Remove this logic once social signup is intergated with OIDC
            const params = new URLSearchParams(window.location.search);
            const isUsingLegacyFlow = params.has('token1') && params.has('acct1');
            if (isUsingLegacyFlow && loggedState === 'false' && is_deriv_com) {
                return;
            }

            if (!isUsingLegacyFlow && loggedState === 'true' && !isClientAccountsPopulated) {
                // Perform silent login
                if (isAuthenticating.current) return;
                isAuthenticating.current = true;
                setClientIsSingleLoggingIn(true);
                requestOidcLogin();
            }

            if (!isUsingLegacyFlow && loggedState === 'false' && isClientAccountsPopulated) {
                // Perform single logout
                if (isLoggingOut.current) return;
                isLoggingOut.current = true;
                setClientIsSingleLoggingIn(true);
                oAuthLogout();
            }
        };
        renderSilentLoginAndLogout();
    }, [
        loggedState,
        isClientAccountsPopulated,
        is_client_store_initialized,
        isSilentLoginExcluded,
        prevent_single_login,
    ]);
};

export default useSilentLoginAndLogout;
