'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { FontFamily } from '@tiptap/extension-font-family';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { useState, useRef, useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontFamily,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[400px] p-4 border-0 outline-none',
        style: 'font-family: inherit;',
      },
    },
  });

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { content: extractedContent } = await response.json();
        if (editor) {
          editor.commands.setContent(extractedContent);
        }
      } else {
        alert('Failed to process document. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error processing document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [editor]);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file || !editor) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [editor]);

  const addEmoji = (emoji: string) => {
    if (editor) {
      editor.chain().focus().insertContent(emoji).run();
    }
  };

  const commonEmojis = ['😊', '😍', '🎉', '👍', '❤️', '🔥', '✨', '🌟', '💯', '🙏', '🌹', '🌙', '☀️', '⭐', '💫'];

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="text-lg text-gray-600 mb-2">Loading editor...</div>
          <div className="text-sm text-gray-500">Please wait while the rich text editor loads.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-3 bg-gray-50 flex flex-wrap gap-2">
        {/* File Import */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            📄 Import Doc
          </button>
          
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            🖼️ Add Image
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Formatting */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            <strong>B</strong>
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('italic') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            <em>I</em>
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('underline') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            <u>U</u>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Headings */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            H1
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            H2
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            H3
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('bulletList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            • List
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('orderedList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            1. List
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Text Alignment */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            ⬅️
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            ↔️
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            ➡️
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Font Family */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="px-2 py-1 text-sm border border-gray-300 rounded"
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
          <option value="Playfair Display">Playfair</option>
          <option value="Noto Nastaliq Urdu">اردو</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
          title="Text Color"
        />

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Quote and Code */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('blockquote') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            " Quote
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`px-2 py-1 text-sm rounded ${editor.isActive('code') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          >
            &lt;/&gt;
          </button>
        </div>
      </div>

      {/* Emoji Panel */}
      <div className="border-b border-gray-300 p-2 bg-gray-50">
        <div className="flex flex-wrap gap-1">
          <span className="text-sm text-gray-600 mr-2">Quick Emojis:</span>
          {commonEmojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addEmoji(emoji)}
              className="px-2 py-1 hover:bg-gray-200 rounded text-lg"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>

      {/* Status */}
      {isLoading && (
        <div className="border-t border-gray-300 p-2 bg-blue-50 text-blue-700 text-sm">
          Processing... Please wait.
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,.pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
      />
      
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        className="hidden"
      />
    </div>
  );
}
