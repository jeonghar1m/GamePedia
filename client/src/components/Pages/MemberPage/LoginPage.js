import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {siteTitle} from '../../Config';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage() {
    useEffect(() => {
        document.title=`로그인 - ${siteTitle}`;
    }, [])

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();        

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
            .then(res => {
                if(res.payload.loginSuccess) window.location.replace('/');
                else    alert('ID 혹은 비밀번호가 맞지 않습니다.');
            })
    }

    return (
        <div>
            <section className="inner">
                <div>
                    <form method="post" onSubmit={onSubmitHandler}>
                        <fieldset>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td><input type="text" name="id" value={Id} onChange={onIdHandler} required /></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td><input type="password" name="pw" value={Password} onChange={onPasswordHandler} required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button variant="secondary" type="submit">로그인</Button>
                            {/* <Button variant="secondary">ID/비밀번호 찾기</Button> */}
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default withRouter(LoginPage)
