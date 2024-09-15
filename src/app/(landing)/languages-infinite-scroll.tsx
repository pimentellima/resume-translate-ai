import { Button } from '@/components/ui/button'
import { languages } from '@/lib/languages'

export default function LanguagesInfiniteScroll() {
    return (
        <div
            className={`overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]`}
        >
            <ul className="flex gap-3 animate-infinite-scroll">
                {languages.map((lang) => (
                    <Button variant={'outline'} size={'lg'} key={lang.value}>
                        {lang.label}
                    </Button>
                ))}
            </ul>
        </div>
    )
}
