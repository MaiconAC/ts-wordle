import './styles.css';
import logo from '../../assets/logo.png';

export function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="header-section">
                    <a href="/">
                        <img src={logo} alt="Logo do site" className="img-logo"/>
                    </a>
                    <span>Wordlee</span>
                </div>
            </div>
        </header>
    )
}
