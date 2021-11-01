import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {siteTitle} from '../../Config';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    useEffect(() => {
        document.title=`회원가입 - ${siteTitle}`;
    }, [])

    const dispatch = useDispatch();
    
    const [Id, setId] = useState("");
    const [Nickname, setNickname] = useState("");
    const [Name, setName] = useState("");
    const [Mail, setMail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onMailHandler = (event) => {
        setMail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();      

        if(Password !== ConfirmPassword)    return alert("비밀번호가 같지 않습니다.");

        let body = {
            id: Id,
            password: Password,
            nickname: Nickname,
            name: Name,
            email: Mail
        }

        dispatch(registerUser(body))
            .then(res => {
                if(res.payload.success) props.history.push("/login");
                else    alert("회원가입에 실패했습니다.");
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
                                        <td>닉네임</td>
                                        <td><input type="text" name="nickname" value={Nickname} onChange={onNicknameHandler} required /></td>
                                    </tr>
                                    <tr>
                                        <td>이름</td>
                                        <td><input type="text" name="name" value={Name} onChange={onNameHandler} required /></td>
                                    </tr>
                                    <tr>
                                        <td>이메일</td>
                                        <td><input type="email" name="mail" value={Mail} onChange={onMailHandler} required /></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td><input type="password" name="pw" value={Password} onChange={onPasswordHandler} required /></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호 확인</td>
                                        <td><input type="password" name="pw" value={ConfirmPassword} onChange={onConfirmPasswordHandler} required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button variant="secondary" type="submit">회원가입</Button>
                        </fieldset>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default withRouter(RegisterPage)
