import Svg, { Path } from "react-native-svg";


const DirectionIcon = ({size= 20, color= '#bfbfbf'}) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill={color} >
<Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10ZM13 7L9.307 7.739C8.92011 7.81654 8.5648 8.00678 8.28579 8.28579C8.00678 8.5648 7.81654 8.92011 7.739 9.307L7 13L10.693 12.261C11.0801 12.1836 11.4356 11.9935 11.7148 11.7144C11.994 11.4354 12.1844 11.08 12.262 10.693L13 7Z"
fill={color} />
</Svg>
    );
}

export default DirectionIcon;