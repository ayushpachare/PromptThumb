import React from 'react'
import { thumbnailStyles, type ThumbnailStyle } from '../assets/assets'
import { ChevronDownIcon, CpuIcon, ImageIcon, PenToolIcon, SparkleIcon, SquareIcon } from 'lucide-react';
import { div } from 'motion/react-client';

const StyleSelector = ({value, onChange, isOpen, setIsOpen} :
  {value :ThumbnailStyle; onChange: (style: ThumbnailStyle) => void; isOpen: boolean; setIsOpen:(open :boolean)=> void})=>{

    const styleDescriptions: Record<ThumbnailStyle, string> = {
        'Bold & Graphic': 'Vibrant colors, strong contrasts, and eye-catching graphics to make your thumbnail stand out.',
        'Minimalist': 'Clean design with ample white space, simple typography, and a focus on essential elements.',
        'Photorealistic': 'High-quality images that look like real photographs, with attention to detail and lighting.',
        'Illustrated': 'Hand-drawn or digitally created illustrations that add a unique and artistic touch to your thumbnail.',
        'Tech/Futuristic': 'Sleek designs with modern elements, often incorporating metallic colors, grids, and digital motifs.',
    }

    const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
        'Bold & Graphic': <SparkleIcon className='w-4 h-4 text-zinc-200'/>,
        'Minimalist': <SquareIcon className='w-4 h-4 text-zinc-200'/>,
        'Photorealistic': <ImageIcon className='w-4 h-4 text-zinc-200'/>,
        'Illustrated': <PenToolIcon className='w-4 h-4 text-zinc-200'/>,
        'Tech/Futuristic': <CpuIcon className='w-4 h-4 text-zinc-200'/>,    
    }

    return (
    <div className='relative space-y-3 dark'>  
      <label className='block text-sm font-medium text-zinc-200'>Thumbnail Style</label>

<button type='button'
    onClick={() => setIsOpen(!isOpen)}
    className='w-full flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-left hover:bg-white/6 transition'
    >
    <div className='space-y-1' >
        <div className='flex items-center gap-2 font-medium'>
            {styleIcons[value]}
            <span>{value}</span>
        </div>
        <p className='text-xs text-zinc-400' >{styleDescriptions[value]}</p>
    </div>
    <ChevronDownIcon className={[`h-5 w-5 text-zinc-400 transition-transform`,isOpen && 'rotate-180'].join(' ')} />
     </button>

{isOpen && (
  <div className=" w-full rounded-md bg-black/10 border border-white/10 shadow-lg"> 
    {thumbnailStyles.map((style) => (
      <button
        key={style}
        type="button"
        onClick={() => {
          onChange(style)
          setIsOpen(false)
        }}
        className={`w-full flex items-center gap-2 px-4 py-3 text-left transition hover:bg-white/5
          ${style === value ? 'bg-white/10' : ''}`}>

            <div className='mt-0.5'>
                {styleIcons[style]}
            </div>
            <div>
                <p className='font-medium' >{style}</p>
                <p className='text-xs text-zinc-400'>{styleDescriptions[style]}</p>
            </div>
       
      </button>
    ))}
  </div>
)}

    </div>
  )
}

export default StyleSelector

