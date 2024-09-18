import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import SwitchIsYearly from './switch-is-yearly'

export default function PricingPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string }
}) {
    const isYearly = searchParams?.yearly === 'true'

    const plans = [
        {
            name: 'Free',
            price: {
                monthly: 0,
                yearly: 0,
            },
            features: [
                'Export to PDF',
                'Translate to multiple languages',
                'Translate up to 2 resumes per month',
            ],
        },
        {
            name: 'Pro',
            price: {
                monthly: 5,
                yearly: 49,
            },
            features: [
                'Export to PDF',
                'Translate to multiple languages',
                'Unlimited AI translations',
            ],
        },
    ]

    return (
        <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="font-serif text-3xl font-medium text-gray-900 sm:text-5xl">
                        Pricing
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Choose the perfect plan for your needs
                    </p>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <span className="text-base font-medium text-gray-500">
                        Monthly
                    </span>
                    <SwitchIsYearly isYearly={isYearly} />
                    <span className="text-base font-medium text-gray-500">
                        Yearly
                    </span>
                </div>
                <div className="flex justify-center mt-3">
                    {isYearly && (
                        <span className="absolute inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Save 16%
                        </span>
                    )}
                </div>

                <div className="space-y-12 mt-14 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="relative bg-white shadow-xl rounded-2xl"
                        >
                            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                                <div>
                                    <h3
                                        className="inline-flex px-4 py-1 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-100 rounded-full"
                                        id={plan.name + '-plan'}
                                    >
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="flex items-baseline mt-4 text-6xl font-extrabold">
                                    $
                                    {isYearly
                                        ? plan.price.yearly
                                        : plan.price.monthly}
                                    <span className="ml-1 text-2xl font-medium text-gray-500">
                                        {isYearly ? '/year' : '/month'}
                                    </span>
                                </div>
                                <p className="mt-5 text-lg text-gray-500">
                                    {plan.name === 'Free'
                                        ? 'Get started with basic features'
                                        : 'Unlock unlimited translations'}
                                </p>
                            </div>
                            <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                                <ul role="list" className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0">
                                                <Check
                                                    className="w-6 h-6 text-green-500"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="ml-3 text-base text-gray-700">
                                                {feature}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <Button
                                        className="w-full text-base"
                                        size="lg"
                                        variant={
                                            plan.name === 'Free'
                                                ? 'outline'
                                                : 'default'
                                        }
                                    >
                                        {plan.name === 'Free'
                                            ? 'Get started'
                                            : 'Upgrade to Pro'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
