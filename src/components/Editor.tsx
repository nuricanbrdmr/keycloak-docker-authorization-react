import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Editor Sayfası</h1>
            <br />
            <p>Size bir Editör rolü atanmış olmalıdır.</p>
            <div className="flexGrow">
                <Link to="/">Ana Sayfa</Link>
            </div>
        </section>
    )
}

export default Editor