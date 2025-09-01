// components/new-audit-form.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const auditSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
})

type AuditFormValues = z.infer<typeof auditSchema>

export function NewAuditForm() {
  const queryClient = useQueryClient()
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: AuditFormValues) => {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to run audit')
      }
      return response.json()
    },
    onSuccess: () => {
      toast.success("Audit completed successfully!")
      queryClient.invalidateQueries({ queryKey: ['reports'] })
      reset()
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.")
    },
  })

  const onSubmit = (data: AuditFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Run a New Audit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
          <div className="flex-grow space-y-2">
            <Input 
              placeholder="https://example.com" 
              {...register("url")} 
            />
            {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Auditing...
              </>
            ) : "Run Audit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}