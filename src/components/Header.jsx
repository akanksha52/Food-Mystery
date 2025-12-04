import logo from './../assets/logo.jpg'

export default function Header() {
  return (
    <header className="header">
      <img 
        src={logo}
        className="logo" 
        alt="Food Mystery Logo" 
      />
      <h1 className="title">Food Mystery</h1>
    </header>
  );
}
