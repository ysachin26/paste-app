import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removePaste } from '../redux/features/pasteSlice';
import { FaRegEdit } from 'react-icons/fa';
import { IoCopyOutline, IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { CiShare1 } from "react-icons/ci";

const copyFromClipboard = async (text) => {
	// small guard and user feedback
	if (!navigator?.clipboard) {
		toast.error('Clipboard not supported');
		return;
	}
	try {
		await navigator.clipboard.writeText(text);
		toast.success('Copied');
	} catch {
		toast.error('Copy failed');
	}
};

	const sharePaste= async (p)=>
{
     const Url = `${window.location.origin}/?pasteId=${p.id}`
	 if(navigator.share)
	 {
		try {
			await navigator.share(
				{
                    title:p.title||'shared paste',
					text:p.data,
					url:Url
				}
			);
			toast.success("shared successfully")
		}
		catch(error)
		{
			if(error.name!=='AbortError')
			{
				await copyFromClipboard(Url);
				toast.success("link copied to clipboard successfully")
			}
			
		}
	 }else
	 {
		   await copyFromClipboard(Url);
    toast.success('Link copied to clipboard');
	 }
}

export const Pastes = () => {
	const { pastes } = useSelector((state) => state.paste);
	const dispatch = useDispatch();

	const deleteFromPaste = (id) => {
		dispatch(removePaste(id));
	};


	return (
		<div className="p-4">
		 
			<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{pastes.length > 0 ? (
					pastes.map((p) => (
						<div key={p.id} className="flex justify-center">
						 <div className="w-full max-w-xl border rounded-lg shadow-sm bg-white overflow-hidden flex flex-col">
						
								<div className="flex items-center justify-between px-4 py-3 border-b">
									<h3 className="text-lg font-medium truncate">{p.title || 'Untitled'}</h3>
									<div className="flex items-center gap-2">
										<NavLink to={`/?pasteId=${p.id}`} aria-label="Edit paste" className="text-gray-600 hover:text-gray-800">
											<FaRegEdit />
										</NavLink>
										<button onClick={() => deleteFromPaste(p.id)} aria-label="Delete paste" className="text-red-600 hover:text-red-800">
											<MdDelete />
										</button>
										<button onClick={() => copyFromClipboard(p.data)} aria-label="Copy paste" className="text-gray-600 hover:text-gray-800">
											<IoCopyOutline />
										</button>
										<NavLink to={`Pastes/?pasteId=${p.id}`} aria-label="View paste" className="text-gray-600 hover:text-gray-800">
											<IoEyeSharp />
										</NavLink>

										<button 
  onClick={() => sharePaste(p)} 
  aria-label="Share" 
  className="text-gray-600 hover:text-gray-800"
>
  <CiShare1 />
</button>
									</div>
								</div>

						 
								<div className="px-4 py-3">
									<pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words text-sm">{p.data}</pre>
								</div>

					 
								<div className="px-4 py-2 border-t">
									<small className="text-xs text-gray-500">{p.createAt}</small>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-600">No pastes available</p>
				)}
			</div>
		</div>
	);
};

export default Pastes;
