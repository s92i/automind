"use client"

import { useUser } from "@/hooks/useUser"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Node, useEdgesState, useNodesState } from "reactflow"
import "reactflow/dist/style.css"

const Page = () => {
    const params = useParams()
    const slug = params.slug as string
    const { user } = useUser()

    const [selectedNode, setSelectedNode] = useState<Node | null>(null)
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const [template, setTemplate] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalNodeData, setModalNodeData] = useState<any>(null)

    return (
        <div className="flex h-full">

        </div>
    )
}

export default Page