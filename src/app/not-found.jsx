export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '10vh', height: '100vh' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/order" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                Go back home
            </a>
        </div>
    );
}