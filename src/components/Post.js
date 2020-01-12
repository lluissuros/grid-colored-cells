import React, { useEffect, useState } from "react";
import postDebounced from "../api/postDebounced";

function Post({ objectToPost = {} }) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setIsSaving(true);
    const onPostSucces = () => {
      setIsSaving(false);
      setHasError(false);
    };
    const onPostError = () => {
      setIsSaving(false);
      setHasError(true);
    };
    console.log(postDebounced(objectToPost, onPostSucces, onPostError));
  }, [objectToPost]);

  if (isSaving) {
    return (
      <section>
        <div>
          <span role="img" aria-label="saving">
            Auto Saving ... ⏱️⏳⏱️⏳⏱️⏳⏱️⏳⏱️⏳⏱️⏳
          </span>
        </div>
      </section>
    );
  }

  return (
    <section>
      {hasError ? (
        <div>
          <span role="img" aria-label="saving">
            Some Error ocurred on autosaving 😔❌😔❌😔❌😔❌😔❌
          </span>
        </div>
      ) : (
        <div>
          <span role="img" aria-label="saving">
            Autosaved correctly ✅👍✅👍✅👍✅👍✅👍
          </span>
        </div>
      )}
    </section>
  );
}

export default Post;
