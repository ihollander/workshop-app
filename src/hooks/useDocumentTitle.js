import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, [title]);
}

export default useDocumentTitle;
