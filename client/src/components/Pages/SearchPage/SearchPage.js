import React, { useEffect, useState } from 'react';
import { siteTitle } from '../../Config';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function SearchPage() {
    const [SearchValue, setSearchValue] = useState("");
    
    const onSearchValueHandler = (event) => {
        setSearchValue(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        window.location.replace(`/search/${SearchValue}`);
    }
    
    useEffect(() => {
        document.title = `영화 검색 - ${siteTitle}`;
    }, [])

    return (
        <div>
            <section className="inner">
                <div className="container">
                    <form method="post" onSubmit={onSubmitHandler}>
                        <fieldset>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>검색</td>
                                        <td><input type="text" value={SearchValue} onChange={onSearchValueHandler} required /></td>
                                        <Button variant="secondary" onSubmit={onSubmitHandler} type="submit">확인</Button>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </form>

                </div>
            </section>
        </div>
    )
}

export default withRouter(SearchPage);
