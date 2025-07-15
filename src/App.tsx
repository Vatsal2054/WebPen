import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './context/EditorProvider';
import { ApiProvider } from './context/ApiProvider';
import Layout from './pages/Layout';
import EditorPage from './pages/Editor';
import UniversalEditor from './pages/UniversalEditor';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ApiProvider>
      <EditorProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="editor" element={<EditorPage />} />
              <Route path="editor/:id" element={<EditorPage />} />
              <Route path="universal" element={<UniversalEditor />} />
              <Route path="universal/:id" element={<UniversalEditor />} />
            </Route>
          </Routes>
        </Router>
      </EditorProvider>
    </ApiProvider>
  );
}
