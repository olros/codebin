import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import URLS from 'URLS';
import { getCodeById, createCode, updateCode } from 'supabase';
import { useShare } from 'hooks/useShare';
import Button, { BUTTON_CLASSES, BUTTON_STYLE } from 'components/Button';
import { LANGUAGES } from 'common';

const DEFAULT_LANGUAGE = 'typescript';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [code, setCode] = useState('');
  const { share } = useShare({ url: window.location.href, title: `Kodesnutt i ${language}` });

  useEffect(() => {
    if (id) {
      loadCode(id);
    } else {
      setCode('');
      setLanguage(DEFAULT_LANGUAGE);
    }
  }, [id]);

  const loadCode = async (id: string) => {
    const response = await getCodeById(id);
    if (response.data?.length) {
      const data = response.data[0];
      setCode(data.content);
      setLanguage(data.language);
    }
  };

  const save = async () => {
    if (id) {
      await updateCode(id, { content: code, language });
    } else {
      createNew();
    }
  };

  const createNew = async () => {
    const response = await createCode({ content: code, language });
    if (response.data?.length) {
      const data = response.data[0];
      navigate(`${URLS.CODE}${data.id}/`);
    }
  };

  const runCode = () => Function(String('"use strict";' + code))();

  return (
    <div className='h-screen bg-gray-900 overflow-hidden'>
      <div className='max-w-xs mx-auto' style={{ maxWidth: '1000px' }}>
        <div className='md:h-auto p-4 flex flex-wrap'>
          <Button onClick={save}>Lagre</Button>
          {Boolean(id) && (
            <>
              <Link className={BUTTON_CLASSES} style={BUTTON_STYLE} to={URLS.LANDING}>
                Ny
              </Link>
              <Button onClick={share}>Del</Button>
              {(language === 'typescript' || language === 'javascript') && <Button onClick={runCode}>Kjør i nettleser</Button>}
            </>
          )}
          <select className={BUTTON_CLASSES} onChange={(e) => setLanguage(e.target.value)} style={BUTTON_STYLE} value={language}>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <MonacoEditor
          defaultLanguage={DEFAULT_LANGUAGE}
          height='calc(100vh - 5rem)'
          language={language}
          onChange={(value) => setCode(value || '')}
          theme='vs-dark'
          value={code}
        />
      </div>
    </div>
  );
};

export default Editor;
