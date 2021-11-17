import React, {useEffect, useState} from 'react';
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
        <div className="flex flex-jc-c flex-ai-c height-100p">
            <section id="member-page">
                <div id="main-content" style={{margin: '3% 0'}}>
                <div id="content-name">회원가입</div>
                    <form method="post" onSubmit={onSubmitHandler}>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="Id_field">ID</label>
                            </div>
                            <div className="element">
                                <input
                                type="text"
                                value={Id}
                                onChange={onIdHandler}
                                name="id"
                                id="Id_field"
                                placeholder="사용하실 ID를 입력해주세요."
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="email_field">닉네임</label>
                            </div>
                            <div className="element">
                                <input
                                type="text"
                                value={Nickname}
                                onChange={onNicknameHandler}
                                name="nickname"
                                id="Name_field"
                                placeholder="사용하실 닉네임을 입력해주세요."
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="email_field">이메일</label>
                            </div>
                            <div className="element">
                                <input
                                type="text"
                                value={Mail}
                                onChange={onMailHandler}
                                name="mail"
                                id="Mail_field"
                                placeholder="이메일을 입력해주세요."
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="email_field">이름</label>
                            </div>
                            <div className="element">
                                <input
                                type="text"
                                value={Name}
                                onChange={onNameHandler}
                                name="name"
                                id="Name_field"
                                placeholder="이름을 입력해주세요."
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="password_field">비밀번호</label>
                            </div>
                            <div className="element">
                                <input
                                type="password"
                                value={Password}
                                onChange={onPasswordHandler}
                                name="password"
                                id="password_field"
                                placeholder="8자리 이상 16자리 이하의 비밀번호를 입력해주세요." 
                                pattern="^([a-z0-9_]){8,16}$"
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="input-area">
                            <div className="element label">
                                <label htmlFor="confirm_password_field">비밀번호 확인</label>
                            </div>
                            <div className="element">
                                <input
                                type="password"
                                value={ConfirmPassword}
                                onChange={onConfirmPasswordHandler}
                                name="confirmPassword"
                                id="confirm_password_field"
                                placeholder="비밀번호를 한 번 더 입력해주세요." 
                                pattern="^([a-z0-9_]){8,16}$"
                                required
                                ></input>
                            </div>
                        </div>
                        <div id="button-area">
                            <span>
                                <button className="signup" type="submit">
                                회원가입
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default withRouter(RegisterPage)
