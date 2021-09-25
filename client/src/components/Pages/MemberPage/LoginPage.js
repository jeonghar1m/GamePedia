import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {siteTitle} from '../../Config';

function LoginPage() {
    useEffect(() => {
        document.title=`로그인 - ${siteTitle}`;
    }, [])

    return (
        <div>
            <section className="inner">
                <div>
                    <form method="post">
                        <fieldset>
                            <legend>로그인</legend>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td><input type="text" name="id" required /></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td><input type="password" name="pw" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button variant="secondary">확인</Button>
                            <Button variant="secondary">ID/비밀번호 찾기</Button>
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default LoginPage
