import './AuthPage.css'

export function AuthPage() {
    const login = (e) => {
        const username = document.getElementById('name');
        const pass = document.getElementById('pass');
        const data = {
            login: username.value,
            password: pass.value
        };

        e.preventDefault();
        fetch('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.auth === 'success') {
                localStorage.setItem('ToDo_auhorized', data.name);
                location.pathname = '/'
            }
            else {
                const form = document.querySelector('.auth_form_inputs');
                form.insertAdjacentHTML('beforeend', `
                        <h3 id="err">Неудачная попытка авторизации!</h3>
                `)
                const errorMsg = document.getElementById('err');
                setTimeout(() => errorMsg.remove(), 2000)
            }
        }  
        )
    }

    return (
        <div className='login_page_wrapper'>
            <form className='auth_form'>
                <h1 className='auth_form_header'>Авторизация</h1>
                <div className='auth_form_inputs'>
                    <label className='auth_form_label'>
                        <h4 className='auth_form_label_header'>Логин:</h4>
                        <input className='auth_form_input_row' type="text" name='login' id='name' />
                    </label>
                    <label className='auth_form_label'>
                        <h4 className='auth_form_label_header'>Пароль:</h4>
                        <input className='auth_form_input_row' type="password" name="password" id="pass" />
                    </label>
                    <button className='login_btn' onClick={login}>Войти</button>
                </div>
            </form>
        </div>
    )
}
