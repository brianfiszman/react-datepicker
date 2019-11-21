import styled from 'styled-components';

const AppContainer = styled.div`
	text-align: center;
`;

const Logo = styled.img`
	height: 40vmin;
`;

const Header = styled.header`
	background-color: #282c34;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
`;

export { AppContainer, Logo, Header };
