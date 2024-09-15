import { Button } from '@/components/ui/button'
import { languages } from '@/lib/languages'

export default function LanguagesInfiniteScroll() {
    const firstRow = [
        ...languages.slice(0, 10),
        ...languages.slice(0, 10),
    ]

    const secondRow = [
        ...languages.slice(10),
        ...languages.slice(10),
    ]

    return (
        <div
            className={`overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]`}
        >
            <ul className="flex gap-3 animate-infinite-scroll">
                {firstRow.map((lang) => (
                    <Button variant={'outline'} size={'lg'} key={lang.value}>
                        {lang.label}
                    </Button>
                ))}
            </ul>
            <ul className="flex gap-3 mt-2 animate-infinite-scroll">
                {secondRow.slice(11, 20).map((lang) => (
                    <Button variant={'outline'} size={'lg'} key={lang.value}>
                        {lang.label}
                    </Button>
                ))}
            </ul>
        </div>
    )
}
