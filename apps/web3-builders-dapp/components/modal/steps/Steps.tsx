import React from 'react'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Button } from '../../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { toast } from "sonner"
import OptionToCall from './custom/OptionToCall'
import { Control, FieldValues, FormState, useFieldArray, UseFormClearErrors, useFormContext, UseFormGetValues, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch, UseFromSubscribe } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ethers } from 'ethers'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

type Props = {
  register:UseFormRegister<FieldValues>,
  formState:FormState<FieldValues>,
  getValues: UseFormGetValues<FieldValues>,
  watch:  UseFormWatch<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  clearErrors: UseFormClearErrors<FieldValues>,
  setError: UseFormSetError<FieldValues>,
  subscribe: UseFromSubscribe<FieldValues>
  control: Control<FieldValues, any, FieldValues>

}

 function FirstStepContent({register, setValue, control}: Props) {
  return (
    <>


<FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Title</FormLabel>
              <FormControl>
                <Input className='border border-(--hacker-green-4)' placeholder="Proposal Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={control}
          name="isCustom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Title</FormLabel>
              <FormControl>
              <Select {...field} value={field.value ? 'custom' : 'standard'} onValueChange={(value) => {
setValue('isCustom', value);
  }}>
  <SelectTrigger className="w-full text-white border border-(--hacker-green-4)">
    <SelectValue placeholder="Voting Type" />
  </SelectTrigger>
  <SelectContent className='bg-zinc-800 border border-(--hacker-green-4)'>
    <SelectItem className='text-white' value="standard">Standard Voting</SelectItem>
    <SelectItem className='text-white' value="custom">Custom Voting</SelectItem>
  </SelectContent>
</Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



<FormField
          control={control}
          name="shortDescripton"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Description (Onchain)</FormLabel>
              <FormControl>
                <Input className='border border-(--hacker-green-4)' placeholder="Proposal Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Description (Offchain)</FormLabel>
              <FormControl>
              <Textarea {...field}  id='textarea'  className='text-white border border-(--hacker-green-4) outline-none resize-none
  h-28
  '
  placeholder='Enter your proposal description...'
  />  
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />





    </>
  )
}


 function SecondStepContent({
  register,
  formState,
  watch,
  control,
  setValue
 }: Props) {

const {fields, append, update} = useFieldArray({name: 'functionsCalldatas', control});



const [callDataIndex, setCallDataIndex] = React.useState(0);

  return (
    <>

<FormField
          control={control}
          name="urgencyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Urgency Level</FormLabel>
              <FormControl>
              <Select {...field}
  value={field.value.toString()}
  onValueChange={(value) => {
    setValue('urgencyLevel', BigInt(value));
  }}
  >
  <SelectTrigger className="w-full text-white border border-(--hacker-green-4)">
    <SelectValue placeholder="Proposal Urgency" />
  </SelectTrigger>
  <SelectContent className='bg-zinc-800 border border-(--hacker-green-4)'>
    <SelectItem className='text-white' value="0">Low</SelectItem>
    <SelectItem className='text-white' value="1">Medium</SelectItem>
    <SelectItem className='text-white' value="2">High</SelectItem>
  </SelectContent>
</Select>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={control}
          name={`functionsCalldatas.${callDataIndex}.calldata`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Urgency Level</FormLabel>
              <FormControl>
              <Select 
 onValueChange={
  (value) => {
    setValue(`functionsCalldatas.${callDataIndex}.calldata`, value);
  }
 }
 {...field}
 >
  <SelectTrigger className="w-full text-white border border-(--hacker-green-4)">
    <SelectValue placeholder="Proposal Function" />
  </SelectTrigger>
  <SelectContent className='bg-zinc-800 border flex  border-(--hacker-green-4)'>
    <SelectItem className='text-white' value="rewardUser(address, uint256)">
      Reward User With Tokens
      </SelectItem>
    <SelectItem className='text-white' value="punishUser(address, uint256)">Punish User Account</SelectItem>
  </SelectContent>
</Select>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



  {watch(`functionsCalldatas.${callDataIndex}.calldata`) && watch(`functionsCalldatas.${callDataIndex}.calldata`).trim() !== '' && <>


<FormField
          control={control}
          name={`functionsCalldatas.${callDataIndex}.destinationAddress`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Destination Address</FormLabel>
              <FormControl>
<Input {...field} id='userAddr' placeholder='Enter the user address'
className='text-white border border-(--hacker-green-4) outline-none '/>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={control}
          name={`functionsCalldatas.${callDataIndex}.tokenAmount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-base font-light'>Amount</FormLabel>
              <FormControl>
<Input {...field} value={Number(field.value)} id='tokenAmount' placeholder='Enter the user address' type='number'
className='text-white border border-(--hacker-green-4) outline-none '/>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


  
  </>}

<Button onClick={() => {
append({
  calldata: watch(`functionsCalldatas.${callDataIndex}.calldata`),
  destinationAddress: watch(`functionsCalldatas.${callDataIndex}.destinationAddress`),
  tokenAmount: watch(`functionsCalldatas.${callDataIndex}.tokenAmount`),
  target: watch(`functionsCalldatas.${callDataIndex}.target`),
  value: BigInt(0),
});
setCallDataIndex(callDataIndex + 1);
}} className='hover:bg-(--hacker-green-4) hover:scale-95 cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 '>Insert Calldata</Button>

    </>
  )
}


interface ThirdStepContentProps extends Props {
  isCustom: boolean
  
}

 function ThirdStepContent({isCustom
 , register, control
 }: ThirdStepContentProps) {

  const [customVoteOption, setCustomVoteOption] = React.useState<{
    title: string,
    optionId: number,
    calldataIndicies: number[],
  }>({
    title: '',
    optionId: 0,
    calldataIndicies: []
  })
  

  const addCustomVoteOption = () => {
    if(customVoteOption.title.trim() === '') {
      toast.error('Title cannot be empty');
      return
    }
    append(customVoteOption)
toast.success('Option Added');
  }

const {fields, append, remove, update, prepend}=useFieldArray({
  control,
  name:'customVotesOptions'
});

const [optionId, setOptionId] = React.useState(0);

  return (
    <>
    {
      isCustom &&
   <div className='flex flex-col w-full gap-4'>
 

  <div className="flex flex-col gap-1">
  <Label htmlFor="customOptionName" className='text-white text-base font-light'>Option Description</Label>
  <Input {...register('customOptionName')}
   id='customOptionName' placeholder='Enter the user address'
    className='text-white border border-(--hacker-green-4) outline-none '/>
  </div>


  <div className="flex flex-col gap-1">
  <Label htmlFor="proposal-type" className='text-white text-base font-light'>Proposal Function Calldata</Label>
  <p className='text-sm text-gray-400'>
    What function should be called when the proposal ends up with this option?
  </p>


  </div>
  <div className='flex flex-col overflow-y-auto max-h-32 h-full gap-4'>
    {fields.map((field, index) => {
      return (
        <OptionToCall key={field.id} {...field} index={index} removeOption={remove} updateOption={update} />
      )
    })}
  </div>

<div className="self-end">
  <Button onClick={addCustomVoteOption} className='hover:bg-(--hacker-green-4) hover:scale-95 cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 '>
    Add Option
  </Button>
</div>

   </div>
    }
    
    </>
  )
}


 function FourthStepContent({}: Props) {
  return (
    <div className='flex flex-col gap-3'>
    <div className='flex flex-col gap-1'>
    <Label htmlFor="proposalEndTime" className='text-white text-base font-light'>Proposal End Time</Label>
    <Popover>
                <PopoverTrigger name='proposalEndTime' asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "max-w-64 w-full pl-3 text-left hover:bg-zinc-800 font-normal bg-zinc-700 border-(--hacker-green-4) ",
                      )}
                    >
                    
                      <CalendarIcon className="ml-auto text-(--hacker-green-4) h-4 w-4 opacity-50" />
                    </Button>
          
                </PopoverTrigger>
                <PopoverContent  className="w-auto bg-zinc-700 p-0" align="start">
                  <Calendar
                    mode="single"
                selected={new Date()}
                  classNames={{
                    'day_selected': 'bg-(--hacker-green-4) hover:text-zinc-800 py-1 px-2 self-center',
                    'cell':'p-2 rounded-lg hover:bg-(--hacker-green-4) hover:text-zinc-800 transition-all duration-300 hover:scale-95 flex-1 h-9 ',
                    'day':'w-full hover:text-white cursor-pointer',
                  'table':' text-sm',
                  'day_today':'bg-(--hacker-green-4) text-white rounded-md',
                    
                  }}
                    onSelect={(date) => console.log(date)}
                   
                    
                  />
                </PopoverContent>
              </Popover>

    </div>

    <div className='flex flex-col gap-1'>
    <Label htmlFor="proposalDelay" className='text-white text-base font-light'>Proposal Delay</Label>
    <div className="flex w-full gap-3 items-center">
    <Input id='customOptionName' placeholder='Amount of time units'
    className='text-white border border-(--hacker-green-4) max-w-64 w-full outline-none '/>

<Select >
  <SelectTrigger className="w-full max-w-32 text-white border border-(--hacker-green-4)">
    <SelectValue placeholder="Time Unit" />
  </SelectTrigger>
  <SelectContent className='bg-zinc-800 border flex  border-(--hacker-green-4)'>
    <SelectItem className='text-white' value={'1'}>
      Seconds
      </SelectItem>
      <SelectItem className='text-white' value={'60'}>
      Minutes
      </SelectItem>
      <SelectItem className='text-white' value={'3600'}>
      Hours
      </SelectItem>

      <SelectItem className='text-white' value={'86400'}>
      Days
      </SelectItem>

  </SelectContent>
</Select>
      
    </div>
      </div>

<div className="self-end">
  <Button className='hover:bg-(--hacker-green-4) hover:scale-95 cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 '>Approve</Button>
</div>
    </div>
  )
}


interface StepProps{
currentStep?:number
}

export function StepContainer({currentStep}: StepProps) {
const 
{
 register,
 formState,
 getValues,
 watch,
 setValue,
 clearErrors,
 subscribe,
 setError,
 control
}=useFormContext();

 switch(currentStep){
  case 0:
    return <FirstStepContent
    register={register}
    formState={formState}
    getValues={getValues}
    watch={watch}
    setValue={setValue}
    clearErrors={clearErrors}
    setError={setError}
    subscribe={subscribe}
    control={control}
    />
  case 1:
    return <SecondStepContent
    register={register}
    formState={formState}
    getValues={getValues}
    watch={watch}
    setValue={setValue}
    clearErrors={clearErrors}
    setError={setError}
    subscribe={subscribe}
    control={control}
    />
  case 2:
    return <ThirdStepContent
    register={register}
    formState={formState}
    getValues={getValues}
    watch={watch}
    setValue={setValue}
    clearErrors={clearErrors}
    setError={setError}
    control={control}
    subscribe={subscribe}
    isCustom={false} />
  case 3:
    return <FourthStepContent
    register={register}
    formState={formState}
    getValues={getValues}
    control={control}
    watch={watch}
    setValue={setValue}
    clearErrors={clearErrors}
    setError={setError}
    subscribe={subscribe}
    />
  default:
    return <FirstStepContent
    register={register}
    formState={formState}
    getValues={getValues}
    watch={watch}
    control={control}
    setValue={setValue}
    clearErrors={clearErrors}
    setError={setError}
    subscribe={subscribe}
    />
}

}