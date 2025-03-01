"use client";

import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #015979;
  color: #dcdcdc;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Newsletter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #222;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  text-align: left;
  margin-top: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  color: #dcdcdc;
  text-decoration: none;
  margin: 5px 0;
  font-size: 14px;
  &:hover {
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Newsletter>
        <h2>Stay Updated</h2>
        <p>Subscribe to get the latest news and updates.</p>
        <InputContainer>
          <Input type="email" placeholder="Enter your email" />
          <Button>Subscribe</Button>
        </InputContainer>
      </Newsletter>
      {/* <FooterGrid>
        <Column>
          <h4>Product</h4>
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Releases</Link>
        </Column>
        <Column>
          <h4>Company</h4>
          <Link href="#">About</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
        </Column>
        <Column>
          <h4>Support</h4>
          <Link href="#">Help Center</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Community</Link>
        </Column>
        <Column>
          <h4>Legal</h4>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </Column>
      </FooterGrid> */}
      <p style={{ marginTop: "20px" }}>
        © {new Date().getFullYear()} Copywrite+. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
