'use client'

import OnboardingLayout from '@/components/onboarding-layout'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const languages = [{ value: 'South Africa', icon: '/countries/south-afric' }] as const

const FormSchema = z.object({
  country: z.string({
    required_error: 'Please select a language.',
  }),
})

export default function Geography() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const selectedCountry = form.watch('country')

  const handleNext = () => {
    if (selectedCountry) {
      localStorage.setItem('userCountry', selectedCountry)
      router.push('/onboarding/insight')
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <OnboardingLayout
      category="GEOGRAPHY"
      title="What country do you live in?"
      subtitle="Check out this list and pick your country!"
      onBack={() => router.push('/onboarding/age')}
      onNext={handleNext}
      nextText="CONTINUE TO INSIGHT"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(' justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value
                          ? languages.find((language) => language.value === field.value)?.value
                          : 'Select language'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-red-500 p-0">
                    <Command>
                      <CommandInput placeholder="Search Country..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.value}
                              key={language.value}
                              onSelect={() => {
                                form.setValue('country', language.value)
                              }}
                            >
                              {language.value}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  language.value === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </OnboardingLayout>
  )
}
