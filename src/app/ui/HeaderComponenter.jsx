// import styled from "styled-components";
// import Logo from "./Logo";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const HeaderComponent = () => {
//   const router = useRouter();
//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <Header>
//       <Link href="/">
//         <Logo />
//       </Link>

//       <Nav>
//         <NavLink onClick={() => navigate("/")}>Home</NavLink>
//         <NavLink onClick={() => scrollToSection("about")}>About</NavLink>
//         <NavLink onClick={() => scrollToSection("features")}>Features</NavLink>
//         <NavLink onClick={() => scrollToSection("testimonials")}>
//           Testimonial
//         </NavLink>
//         <NavLink onClick={() => scrollToSection("pricing")}>Pricing</NavLink>
//       </Nav>

//       <AuthButtons>
//         <Login onClick={() => navigate("/login")}>Login</Login>
//         <SignUp onClick={() => navigate("/signup")}>Sign Up</SignUp>
//       </AuthButtons>

//       <MobileLogin onClick={() => navigate("/login")}>Login</MobileLogin>
//     </Header>
//   );
// };

// export default HeaderComponent;

// // Styled Components
// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   background: white;
//   position: sticky;
//   top: 0;
//   width: 100%;
//   z-index: 9000;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
//   @media (max-width: 768px) {
//     padding: 0.5rem 1rem;
//   }
// `;

// // const Logo = styled.h1`
// //   font-size: 1.5rem;
// //   background: linear-gradient(90deg, #00938e, #20aca7, #015979);
// //   -webkit-background-clip: text;
// //   -webkit-text-fill-color: transparent;
// //   font-weight: bold;
// //   cursor: pointer;
// // `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     position: fixed;
//     top: 0;
//     left: ${({ menuOpen }) =>
//       menuOpen ? "0" : "-100%"}; /* Hide menu off-screen */
//     width: 100vw; /* Full screen width */
//     height: 100vh; /* Full screen height */
//     background: white;
//     padding: 2rem;
//     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//     transition: left 0.3s ease-in-out;
//     z-index: 999;
//   }
// `;

// const NavLink = styled.a`
//   text-decoration: none;
//   color: #333;
//   font-weight: 500;
//   cursor: pointer;

//   &:hover {
//     color: #00796b;
//   }

//   @media (max-width: 768px) {
//     padding: 1rem 0;
//     font-size: 1.2rem;
//     display: block;
//   }
// `;

// const AuthButtons = styled.div`
//   display: flex;
//   gap: 1rem;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const Login = styled.button`
//   background: none;
//   border: none;
//   color: #333;
//   font-weight: 500;
//   cursor: pointer;

//   &:hover {
//     color: #00796b;
//   }
// `;

// const SignUp = styled.button`
//   background: #00796b;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 0.5rem 1rem;
//   cursor: pointer;

//   &:hover {
//     background: #005f56;
//   }
// `;

// // Hamburger Menu Button
// const MobileLogin = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: block;
//     background: #fff;
//     color: #00796b;
//     border: none;
//     padding: 8px 15px;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 16px;
//   }
// `;
