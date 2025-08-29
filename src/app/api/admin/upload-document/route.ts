import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedContent = '';

    if (file.name.endsWith('.docx')) {
      // Handle Word documents
      try {
        const result = await mammoth.convertToHtml({ buffer });
        extractedContent = result.value;
        
        // Convert some HTML to more semantic HTML for better styling
        extractedContent = extractedContent
          .replace(/<p><strong>(.*?)<\/strong><\/p>/g, '<h3>$1</h3>')
          .replace(/<p><em><strong>(.*?)<\/strong><\/em><\/p>/g, '<h2>$1</h2>');
        
      } catch (error) {
        console.error('Error processing Word document:', error);
        return NextResponse.json(
          { error: 'Failed to process Word document' },
          { status: 500 }
        );
      }
    } else if (file.name.endsWith('.pdf')) {
      // Handle PDF documents
      try {
        const pdfData = await pdfParse(buffer);
        const textContent = pdfData.text;
        
        // Convert plain text to basic HTML with paragraphs
        extractedContent = textContent
          .split('\n\n')
          .filter(paragraph => paragraph.trim().length > 0)
          .map(paragraph => `<p>${paragraph.trim().replace(/\n/g, ' ')}</p>`)
          .join('\n');
          
      } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json(
          { error: 'Failed to process PDF document' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format. Please use .docx or .pdf files.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      content: extractedContent,
      message: 'Document processed successfully'
    });

  } catch (error) {
    console.error('Error in document upload:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

