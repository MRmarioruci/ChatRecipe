import {useEffect, useState, useCallback} from 'react'
import Lottie from 'react-lottie-player'
import bookmark from '../assets/animations/bookmarks.json';
import {_get, _remove} from '../api/bookmarksApi';
import {Recipe as RecipeType} from '../types/index';
import Recipe from './Recipe';
import InstructionsModal from './Create/InstructionsModal';
import useCombinedStore from '../State';

function Bookmarks() {
    const [instructionsModal, setInstructionsModal] = useState<boolean | RecipeType>(false);
    const {bookmarks, deleteBookmark, loadBookmarks, updateRecipe} = useCombinedStore();
    const getBookmarks = useCallback(async () => {
        try {
            const data = await _get();
            if(data.status === 'ok'){
                loadBookmarks(data.data)
            }else{
                throw new Error(`Status error ${data}`);
            }
        } catch (error) {
            console.error(error);
        }
    }, [loadBookmarks])

    const removeMe = async (bookmark: RecipeType) => {
        if(!bookmark || !bookmark.id) return false;
        
        const removed = await _remove(bookmark.id);
        if(removed.status === 'ok'){
            deleteBookmark(bookmark.id);
            bookmark['bookmarked'] = false;
            updateRecipe(bookmark.id, bookmark)
        }
    }
    useEffect(() => {
        getBookmarks();
    }, [getBookmarks])
    return (
        <div className="page">
            {bookmarks.length  === 0 &&
                <div className="intro">
                    <div className="lottie">
                        <Lottie
                            loop
                            animationData={bookmark}
                            play
                            style={{ width: 350, height: 350, margin: 'auto' }}
                        />
                    </div>
                    <div>
                        <h2>Bookmarks</h2>
                        <h5 className="text__muted">Here are your saved recipes</h5>
                    </div>
                </div>
            }
            {bookmarks?.map((recipe: RecipeType, idx:number) => {
                return (
                    <div className="card card__bordered" key={`recipe__${idx}`}>
                        <Recipe recipe={recipe} idx={idx} showIngredients={true} />
                        <div className="flex flex__row">
                            <button className="btn btn__primary-soft btn__md text__normal" onClick={() => setInstructionsModal(recipe)}>
                                <span className="material-icons">local_dining</span>
                                View Instructions
                            </button>
                            <button className="btn btn__danger-soft  btn__md text__normal" onClick={() => removeMe(recipe)}>
                                <span className="material-icons">bookmark_remove</span>
                            </button>
                        </div>
                    </div>
                )
                
            })}
            { instructionsModal && <InstructionsModal 
				data={instructionsModal}
				cancel={setInstructionsModal}
			/>}
        </div>
    )
}

export default Bookmarks
