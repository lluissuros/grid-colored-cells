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
        <div>Auto Saving ... ⏱️⏳⏱️⏳⏱️⏳⏱️⏳⏱️⏳⏱️⏳</div>
      </section>
    );
  }

  return (
    <section>
      {hasError ? (
        <div>Some Error ocurred on autosaving 😔❌😔❌😔❌😔❌😔❌</div>
      ) : (
        <div>Autosaved correctly ✅👍✅👍✅👍✅👍✅👍</div>
      )}
    </section>
  );
}

export default Post;
