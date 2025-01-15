export default function HomePage(){
    return(
        <div className="home-container h-screen w-full">
        <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple home page. Click below to go to the Login Page.</p>
        <button onClick={() => alert('Navigate to Login Page')}>Go to Login</button>
    </div>
    </div>
);
}