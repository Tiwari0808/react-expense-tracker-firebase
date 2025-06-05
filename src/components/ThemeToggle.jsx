import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from '../store/themeSlice';
import { Button } from 'react-bootstrap';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  return (
    <Button 
      variant="outline-secondary"
      onClick={() => dispatch(themeActions.toggleTheme())}
    >
      {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;