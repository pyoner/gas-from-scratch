import test from 'tape';
import { webAccessWrapper } from '../../src/helpers';

test('webAccessWrapper', (t) => {
    let success = () => true;
    let failure = () => false;
    let email = 'test@mail.com';

    global.Session = {
        getActiveUser() {
            return {
                getEmail() {
                    return email;
                }
            }
        }
    }

    global.ContentService = {
        createTextOutput(text) {
            return text;
        }
    }

    t.test('test password', (t) => {
        let password = '123';
        let testPassword = webAccessWrapper({ password })(success, failure);

        let result = testPassword({ parameter: { password } });
        t.equal(result, true);

        result = testPassword({ parameter: { password: 'bad password' } });
        t.equal(result, false);
        t.end();
    });

    t.test('test whitelist success', (t) => {
        let whitelist = [email];
        let testWhitelist = webAccessWrapper({ whitelist })(success, failure);

        let result = testWhitelist({ parameter: {} });
        t.equal(result, true);

        t.end();
    });

    t.test('test whitelist failure', (t) => {
        let whitelist = ['failure@mail.com'];
        let testWhitelist = webAccessWrapper({ whitelist })(success, failure);

        let result = testWhitelist({ parameter: {} });
        t.equal(result, false);

        t.end();
    });

    t.test('test denyMessage', (t) => {
        let whitelist = ['failure@mail.com'];
        let denyMessage = 'Access denied';
        let testDenyMessage = webAccessWrapper({ whitelist, denyMessage })(success);

        let result = testDenyMessage({ parameter: {} });
        t.equal(result, denyMessage);

        t.end();
    });
});
