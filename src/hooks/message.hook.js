import { useCallback } from 'react';
import UIkit from '../../node_modules/uikit/dist/js/uikit'

export const useMessage = () => {
  return useCallback(text => {
    if (text) {
      UIkit.notification(text);
    }
  }, []);
}
