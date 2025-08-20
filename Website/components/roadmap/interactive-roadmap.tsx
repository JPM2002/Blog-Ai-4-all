"use client"

import { useCallback, useMemo } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  Controls,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { RoadmapNode } from "./roadmap-node"

interface RoadmapNodeData {
  id: string
  label: string
  description: string
  prereq: string[]
  to: string[]
}

interface InteractiveRoadmapProps {
  nodes: RoadmapNodeData[]
  onNodeClick: (nodeId: string) => void
  viewMode: "compact" | "expanded"
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
}

export function InteractiveRoadmap({ nodes: roadmapNodes, onNodeClick, viewMode }: InteractiveRoadmapProps) {
  // Convert roadmap data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    const positions = {
      math: { x: 100, y: 100 },
      gd: { x: 300, y: 100 },
      backprop: { x: 500, y: 100 },
      cnns: { x: 400, y: 250 },
      rnns: { x: 600, y: 250 },
      attention: { x: 500, y: 400 },
      transformers: { x: 500, y: 550 },
      "modern-nlp": { x: 500, y: 700 },
    }

    return roadmapNodes.map((node) => ({
      id: node.id,
      type: "roadmapNode",
      position: positions[node.id as keyof typeof positions] || { x: 0, y: 0 },
      data: {
        label: node.label,
        description: node.description,
        prereq: node.prereq,
        to: node.to,
        onClick: () => onNodeClick(node.id),
        viewMode,
      },
    }))
  }, [roadmapNodes, onNodeClick, viewMode])

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = []
    roadmapNodes.forEach((node) => {
      node.to.forEach((targetId) => {
        edges.push({
          id: `${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
          style: {
            strokeWidth: 2,
            stroke: "hsl(var(--primary))",
          },
        })
      })
    })
    return edges
  }, [roadmapNodes])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)),
    [setEdges],
  )

  // Update nodes when viewMode changes
  useMemo(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          viewMode,
        },
      })),
    )
  }, [viewMode, setNodes])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
