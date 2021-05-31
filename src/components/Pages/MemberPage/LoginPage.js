import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

class LoginPage extends Component {
    componentDidMount() {
        document.title="로그인 - 마이무비리스트";
    }

    render() {
        return (
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
                                        <td>PW</td>
                                        <td><input type="password" name="pw" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button variant="secondary">확인</Button>
                            <Button variant="secondary">ID/PW 찾기</Button>
                            {/* <input type="submit" value = "확인" />
                            <input type="button" value="ID/PW 찾기"></input> */}
                        </fieldset>
                    </form>
                </div>
            </section>
        );
    }

}

export default LoginPage;