import { Button } from '@/components/ui/button'
import { languages } from '@/lib/languages'

export default function LanguagesInfiniteScroll() {
    return (
        <div
            className={`overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]`}
        >
            <ul className="flex animate-infinite-scroll">
                {[...languages, ...languages.slice(0, 10)].map((lang) => (
                    <Button
                        variant={'outline'}
                        className="w-[200px] mr-[8px]"
                        size={'lg'}
                        key={lang.value}
                    >
                        {lang.label}
                    </Button>
                ))}
            </ul>
        </div>
    )
}
