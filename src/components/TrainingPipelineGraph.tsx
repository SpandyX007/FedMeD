import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'pending' | 'active' | 'completed';
  details: string;
}

interface Edge {
  from: string;
  to: string;
  status: 'pending' | 'active' | 'completed';
}

export default function TrainingPipelineGraph() {
  const { isDark } = useTheme();
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', label: 'Model Distribution', x: 50, y: 150, status: 'completed', details: 'Server → Hospitals' },
    { id: '2', label: 'Hospital A Training', x: 150, y: 50, status: 'completed', details: '12.5K records' },
    { id: '3', label: 'Hospital B Training', x: 150, y: 150, status: 'completed', details: '9.8K records' },
    { id: '4', label: 'Hospital C Training', x: 150, y: 250, status: 'active', details: '15.2K records' },
    { id: '5', label: 'Privacy Layer', x: 250, y: 150, status: 'pending', details: 'DP + Encryption' },
    { id: '6', label: 'FedProx Aggregation', x: 350, y: 150, status: 'pending', details: 'Global Update' },
    { id: '7', label: 'Final Distribution', x: 450, y: 150, status: 'pending', details: 'Model Ready' },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { from: '1', to: '2', status: 'completed' },
    { from: '1', to: '3', status: 'completed' },
    { from: '1', to: '4', status: 'active' },
    { from: '2', to: '5', status: 'completed' },
    { from: '3', to: '5', status: 'completed' },
    { from: '4', to: '5', status: 'pending' },
    { from: '5', to: '6', status: 'pending' },
    { from: '6', to: '7', status: 'pending' },
  ]);

  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 100);

      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];
        const phase = animationPhase % 100;

        if (phase > 15 && phase < 35) {
          newNodes[3] = { ...newNodes[3], status: 'completed' };
        }
        if (phase > 35 && phase < 50) {
          newNodes[4] = { ...newNodes[4], status: 'active' };
        }
        if (phase > 50 && phase < 65) {
          newNodes[4] = { ...newNodes[4], status: 'completed' };
          newNodes[5] = { ...newNodes[5], status: 'active' };
        }
        if (phase > 65 && phase < 80) {
          newNodes[5] = { ...newNodes[5], status: 'completed' };
          newNodes[6] = { ...newNodes[6], status: 'active' };
        }
        if (phase > 80) {
          newNodes[6] = { ...newNodes[6], status: 'completed' };
        }

        return newNodes;
      });

      setEdges((prevEdges) => {
        const newEdges = [...prevEdges];
        const phase = animationPhase % 100;

        newEdges[0].status = phase > 5 ? 'completed' : 'pending';
        newEdges[1].status = phase > 5 ? 'completed' : 'pending';
        newEdges[2].status = phase > 15 ? 'active' : phase > 5 ? 'completed' : 'pending';
        newEdges[3].status = phase > 30 ? 'completed' : 'pending';
        newEdges[4].status = phase > 30 ? 'completed' : 'pending';
        newEdges[5].status = phase > 35 ? 'completed' : phase > 30 ? 'active' : 'pending';
        newEdges[6].status = phase > 50 ? 'active' : phase > 35 ? 'completed' : 'pending';
        newEdges[7].status = phase > 65 ? 'active' : phase > 50 ? 'completed' : 'pending';

        return newEdges;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [animationPhase]);

  const getNodeColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'completed':
          return '#10b981';
        case 'active':
          return '#3b82f6';
        case 'pending':
          return '#6b7280';
        default:
          return '#9ca3af';
      }
    } else {
      switch (status) {
        case 'completed':
          return '#059669';
        case 'active':
          return '#2563eb';
        case 'pending':
          return '#6b7280';
        default:
          return '#d1d5db';
      }
    }
  };

  const getStrokeColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'completed':
          return '#d1fae5';
        case 'active':
          return '#bfdbfe';
        case 'pending':
          return '#d1d5db';
        default:
          return '#9ca3af';
      }
    } else {
      switch (status) {
        case 'completed':
          return '#10b981';
        case 'active':
          return '#3b82f6';
        case 'pending':
          return '#d1d5db';
        default:
          return '#9ca3af';
      }
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${
      isDark
        ? 'bg-slate-900 border-slate-700'
        : 'bg-white border-slate-200'
    }`}>
      <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        Real-time Training Pipeline
      </h2>

      <div className="overflow-x-auto">
        <svg width="100%" height="400" viewBox="0 0 550 350" className="min-w-max">
          <defs>
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
              .node-active { animation: pulse 1s infinite; }
            `}</style>
            <marker
              id="arrowhead-active"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
            <marker
              id="arrowhead-completed"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
            <marker
              id="arrowhead-pending"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#d1d5db" />
            </marker>
          </defs>

          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const markerUrl =
              edge.status === 'active'
                ? 'url(#arrowhead-active)'
                : edge.status === 'completed'
                ? 'url(#arrowhead-completed)'
                : 'url(#arrowhead-pending)';

            const strokeColor = getStrokeColor(edge.status);
            const strokeDasharray = edge.status === 'pending' ? '5,5' : 'none';

            return (
              <line
                key={`edge-${idx}`}
                x1={fromNode.x + 40}
                y1={fromNode.y}
                x2={toNode.x - 40}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={edge.status === 'active' ? 3 : 2}
                markerEnd={markerUrl}
                strokeDasharray={strokeDasharray}
                className={edge.status === 'active' ? 'node-active' : ''}
                opacity={edge.status === 'pending' ? 0.5 : 1}
              />
            );
          })}

          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={30}
                fill={getNodeColor(node.status)}
                stroke={getStrokeColor(node.status)}
                strokeWidth={node.status === 'active' ? 3 : 2}
                opacity={node.status === 'pending' ? 0.5 : 1}
                className={node.status === 'active' ? 'node-active' : ''}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={isDark ? '#1f2937' : '#fff'}
                fontSize="18"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 rounded-lg border ${
              isDark
                ? 'border-slate-700 bg-slate-800'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full inline-block mr-2"
              style={{ backgroundColor: getNodeColor(node.status) }}
            />
            <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              {node.label}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {node.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
