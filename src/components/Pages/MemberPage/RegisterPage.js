import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {siteTitle} from '../../Config';

function RegisterPage() {
    useEffect(() => {
        document.title=`회원가입 - ${siteTitle}`;
    }, [])

    return (
        <div>
            <section className="inner">
                <div>
                    <form method="post">
                        <fieldset>
                            <legend>회원가입</legend>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td><input type="text" name="id" required /></td>
                                    </tr>
                                    <tr>
                                        <td>Mail</td>
                                        <td><input type="text" name="mail" required /></td>
                                    </tr>
                                    <tr>
                                        <td>PW</td>
                                        <td><input type="password" name="pw" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button variant="secondary">확인</Button>
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default RegisterPage
