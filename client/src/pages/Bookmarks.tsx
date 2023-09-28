import {useEffect, useState, useCallback} from 'react'
import { useGlobalState } from '../context/GlobalState';
import Lottie from 'react-lottie-player'
import bookmark from '../assets/animations/bookmarks.json';
import {get, remove} from '../api/bookmarksApi';
import {Recipe as RecipeType} from '../types/index';
import Recipe from './Recipe';
import InstructionsModal from './Create/InstructionsModal';

function Bookmarks() {
    const {state, dispatch} = useGlobalState();
    const [instructionsModal, setInstructionsModal] = useState<boolean | RecipeType>(false);
    const {bookmarks} = state;
    const getBookmarks = useCallback(async () => {
        try {
            const data = await get();
            if(data.status === 'ok'){
                dispatch({
                    type: 'BOOKMARKS_SET',
                    payload: data
                })
            }else{
                throw new Error(`Status error ${data}`);
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch])
    const removeMe = async (bookmark_id: number | undefined) => {
        if(!bookmark_id) return false;
        
        const removed = await remove(bookmark_id);
        if(removed.status === 'ok'){
            console.log(removed);
            dispatch({
                type: 'BOOKMARKS_DELETE',
                payload: bookmark_id
            })
        }
    }
    useEffect(() => {
        getBookmarks();
    }, [getBookmarks])
    return (
        <div className="page">
            {bookmarks.length  === 0 &&
                <div className="intro">
                    <div>
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
                            <button className="btn btn__danger-soft  btn__md text__normal" onClick={() => removeMe(recipe.id)}>
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
