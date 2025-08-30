import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Generate tags using Grok
    const prompt = `Based on the following blog post content and title, generate 5-8 relevant tags that would help categorize and make this content discoverable. Return ONLY the tags separated by commas, no additional text.

Title: ${title || 'No title'}
Content: ${content.substring(0, 1500)}...

Tags:`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.4,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content?.trim() || '';
    
    // Clean up the response and split into tags
    let tagsString = response.replace(/^(tags:|Tags:)/i, '').trim();
    
    // Remove any quotes around the entire string
    tagsString = tagsString.replace(/^["']|["']$/g, '');
    
    // Split by commas and clean each tag
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && tag.length < 30)
      .slice(0, 8); // Limit to 8 tags max

    return NextResponse.json({
      success: true,
      tags,
      contentLength: content.length,
      generatedFrom: title ? 'title and content' : 'content only'
    });

  } catch (error) {
    console.error('Tag generation API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate tags',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}