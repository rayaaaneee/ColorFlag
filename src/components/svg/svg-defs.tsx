import SvgPattern, { type SvgPatternInterface } from "@/components/svg/svg-pattern";

interface SvgDefsInterface  {
    patterns: SvgPatternInterface[]
}

const SvgDefs = ({ patterns }: SvgDefsInterface) => {
    return (
        <defs>
            {patterns.map((pattern: SvgPatternInterface, index: number) => (
                <SvgPattern key={index} {...pattern} />
            )) }
        </defs>
    )
}

export default SvgDefs;