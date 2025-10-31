'use client';

import { useState } from 'react';

// Definimos los tipos necesarios
type UserData = {
  name: string;
  email: string;
  career: string;
  experience: string;
};

type Question = {
  id: string;
  text: string;
  type: string;
  options?: string[];
};

type Answers = {
  [key: string]: string;
};

type CompetencyGrade = {
  competency: string;
  grade: number;
};

type Step = 'onboarding' | 'assessment' | 'report';

// Componente de Onboarding
function OnboardingForm({ onStartAssessment }: { onStartAssessment: (data: UserData, questions: Question[]) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    career: '',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generar preguntas de ejemplo
    const questions: Question[] = [
      {
        id: '1',
        text: '¿Cómo manejas situaciones de alta presión?',
        type: 'text'
      },
      {
        id: '2',
        text: 'Describe tu experiencia trabajando en equipo',
        type: 'text'
      },
      {
        id: '3',
        text: '¿Qué metodologías de trabajo conoces?',
        type: 'text'
      }
    ];

    onStartAssessment(formData, questions);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
        Completa tus datos para comenzar
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Carrera / Área
          </label>
          <select
            name="career"
            value={formData.career}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="">Selecciona tu carrera</option>
            <option value="ingenieria">Ingeniería</option>
            <option value="medicina">Medicina</option>
            <option value="derecho">Derecho</option>
            <option value="administracion">Administración</option>
            <option value="educacion">Educación</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Nivel de Experiencia
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="">Selecciona tu nivel</option>
            <option value="principiante">Principiante (0-1 años)</option>
            <option value="intermedio">Intermedio (2-4 años)</option>
            <option value="avanzado">Avanzado (5-7 años)</option>
            <option value="experto">Experto (8+ años)</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Comenzar Evaluación
        </button>
      </form>
    </div>
  );
}

// Componente de Assessment
function Assessment({ 
  questions, 
  userData, 
  onFinishAssessment 
}: { 
  questions: Question[]; 
  userData: UserData; 
  onFinishAssessment: (answers: Answers, summary: string, grades: CompetencyGrade[]) => void; 
}) {
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular resultados
    const summary = `Evaluación completada para ${userData.name}. Se evaluaron ${questions.length} competencias.`;
    const grades: CompetencyGrade[] = [
      { competency: 'Comunicación', grade: 85 },
      { competency: 'Trabajo en equipo', grade: 78 },
      { competency: 'Resolución de problemas', grade: 92 }
    ];

    onFinishAssessment(answers, summary, grades);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
        Evaluación de Competencias
      </h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>
              Pregunta {index + 1}: {question.text}
            </h3>
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              placeholder="Escribe tu respuesta aquí..."
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Finalizar Evaluación
        </button>
      </form>
    </div>
  );
}

// Componente de Report
function Report({ 
  userData, 
  answers, 
  summary, 
  questions, 
  grades, 
  onStartOver 
}: { 
  userData: UserData; 
  answers: Answers; 
  summary: string; 
  questions: Question[]; 
  grades: CompetencyGrade[]; 
  onStartOver: () => void; 
}) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
        Reporte de Evaluación
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Resumen</h3>
        <p style={{ lineHeight: '1.6' }}>{summary}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Calificaciones por Competencia</h3>
        {grades.map((grade, index) => (
          <div key={index} style={{ 
            marginBottom: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#f7fafc',
            borderRadius: '4px'
          }}>
            <strong>{grade.competency}:</strong> {grade.grade}%
          </div>
        ))}
      </div>

      <button
        onClick={onStartOver}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#4299e1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Realizar Nueva Evaluación
      </button>
    </div>
  );
}

// Componente principal
export default function Home() {
  const [step, setStep] = useState<Step>('onboarding');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [reportSummary, setReportSummary] = useState<string>('');
  const [grades, setGrades] = useState<CompetencyGrade[]>([]);

  const handleStartAssessment = (data: UserData, generatedQuestions: Question[]) => {
    setUserData(data);
    setQuestions(generatedQuestions);
    setStep('assessment');
  };

  const handleFinishAssessment = (finalAnswers: Answers, summary: string, newGrades: CompetencyGrade[]) => {
    setAnswers(finalAnswers);
    setReportSummary(summary);
    setGrades(newGrades);
    setStep('report');
  };

  const handleStartOver = () => {
    setUserData(null);
    setQuestions([]);
    setAnswers({});
    setReportSummary('');
    setGrades([]);
    setStep('onboarding');
  };

  const renderStep = () => {
    switch (step) {
      case 'onboarding':
        return <OnboardingForm onStartAssessment={handleStartAssessment} />;
      case 'assessment':
        return <Assessment questions={questions} userData={userData!} onFinishAssessment={handleFinishAssessment} />;
      case 'report':
        return <Report userData={userData!} answers={answers} summary={reportSummary} questions={questions} grades={grades} onStartOver={handleStartOver} />;
      default:
        return <OnboardingForm onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          padding: '2rem',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1a365d',
            margin: 0
          }}>
            App de Evaluación Cognitiva
          </h1>
          <p style={{ 
            color: '#4a5568',
            fontSize: '1.1rem',
            marginTop: '0.5rem'
          }}>
            Sistema de evaluación de competencias profesionales
          </p>
        </div>
        
        {renderStep()}
      </div>
    </main>
  );
}