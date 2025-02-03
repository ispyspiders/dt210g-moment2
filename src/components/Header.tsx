// Headerkomponent
import './Header.css' // importera CSS för header

// pagetitle (string) skickas som prop och skrivs ut i h1:a
function Header({ pagetitle }: { pagetitle: string }) {

    return (
        <header>
            <h1>{pagetitle}</h1>
        </header>
    )
}

export default Header