export interface SvgPatternInterface {
    x: number,
    y: number,
    patternWidth: number,
    patternHeight: number,
    imageWidth: number,
    imageHeight: number,
    customPatternId?: string
    customImageSrc?: string
}

const SvgPattern = ({ x, y, patternWidth, patternHeight, imageWidth, imageHeight, customPatternId = undefined, customImageSrc = undefined }: SvgPatternInterface) => {
    return (
        <pattern xmlns="http://www.w3.org/2000/svg" id={ customPatternId !== undefined ? customPatternId : "emptyPathImg" } patternUnits="userSpaceOnUse" width={ patternWidth } height={ patternHeight }>
                <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={customImageSrc !== undefined ? `/${customImageSrc}` : "/png-background.jpg" } x={ x } y={ y } width={ imageWidth } height={ imageHeight }/>
        </pattern>
    )
}

export default SvgPattern;