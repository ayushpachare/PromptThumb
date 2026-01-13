import type { AspectRatio, IThumbnail } from '../assets/assets';
import { DownloadIcon, ImageIcon, Loader2Icon } from 'lucide-react';

const previewPanel = ({ thumbnail, isLoading, aspectRatio }:

  { thumbnail: IThumbnail | null, isLoading: boolean; aspectRatio: AspectRatio }) => {

  const aspectClasses = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  } as Record<AspectRatio, string>;

  const ondownloadClick = () => {
    if (!thumbnail?.image_url) return;
    const link = document.createElement('a');
    link.href = thumbnail?.image_url.replace('/upload','/upload/fl_attachment')
    document.body.appendChild(link);
    link.click()
    link.remove()
  }

  return ( <div className='relative mx-auto w-full max-w-2xl'>
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} `}>
        {/* Loading State */}
        {isLoading && (
          <div>
            <Loader2Icon className='size-8 animate-spin text-zinc-400' />
            <div className='text-center'>
              <p className='text-sm font-medium text-zinc-200'>AI is creating your Thumbnail...</p>
              <p className='mt-1 text-xs text-zinc-400'>This may take 10-20 seconds.</p>
            </div>
          </div>
        )}

        {/* Thumbnail Image */}
        {!isLoading && thumbnail?.image_url && (
          <div className='group relative h-full w-full'>
            <img src={thumbnail.image_url} alt={thumbnail.title || "Thumbnail"}
              className='h-full w-full object-cover' />

            <div className='absolute inset-0 flex item-end justify-center bg-black/10
            opacity-0 transition-opacity group-hover:opacity-100'>
              <button onClick={ondownloadClick} type='button' className='mb-35 mt-35 flex items-center gap-2 rounded-md px-5 py-1.5 text-1xl
              font-medium transition bg-pink-500/25 ring-2 ring-white/40 backdrop-blur
              hover:scale-105 active:scale-95 text-white' >
                <DownloadIcon className='size-4 ' />
                Download Thumbnail
              </button>
            </div>

          </div>
        )}

        {/* No Thumbnail State */}

        {!isLoading && !thumbnail?.image_url && (
          <div className='absolute inset-0 flex flex-col m-2 items-center justify-center 
          gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25'>
            <div className='max-sm:hidden flex size-20 items-center justify-center
            rounded-full bg-white/10 '>
              <ImageIcon className='size-10 text-white opacity-50' />
            </div>
            <div className='px-4 text-center'>
              <p className='mt-1 text-xs text-zinc-400'>Generate your first thumbnail</p>
              <p>Fill out the form and click Generate</p>
            </div>
          </div>
        )}


      </div>
    </div> )
}

export default previewPanel
