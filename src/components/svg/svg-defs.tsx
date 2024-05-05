interface SvgDefsInterface {
    x: number,
    y: number,
    patternWidth: number,
    patternHeight: number,
    imageWidth: number,
    imageHeight: number
}

const SvgDefs = ({ x, y, patternWidth, patternHeight, imageWidth, imageHeight }: SvgDefsInterface) => {
    return (
        <defs>
            <pattern xmlns="http://www.w3.org/2000/svg" id={`emptyPathImg`} patternUnits="userSpaceOnUse" width={ patternWidth } height={ patternHeight }>
                <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/png-background.jpg" x={ x } y={ y } width={ imageWidth } height={ imageHeight }/>
            </pattern>
        </defs>
    )
}

export default SvgDefs;