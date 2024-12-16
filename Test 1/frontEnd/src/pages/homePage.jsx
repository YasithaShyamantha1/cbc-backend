import './homePage.css';

export default function HomePage(){
    return(
        <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple home page. Click below to go to the Login Page.</p>
        <button onClick={() => alert('Navigate to Login Page')}>Go to Login</button>
    </div>
);
}