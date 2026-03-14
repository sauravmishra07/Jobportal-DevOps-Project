module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = local.name
  kubernetes_version = "1.33"

  endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true

  addons = {
    coredns = {}

    kube-proxy = {}

    vpc-cni = {
      before_compute = true
    }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # Optional control plane subnets
  control_plane_subnet_ids = module.vpc.intra_subnets

  eks_managed_node_groups = {
    jobportal-demo-ng = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["c7i-flex.large"]

      min_size     = 2
      max_size     = 3
      desired_size = 2

      disk_size = 30

      tags = {
        Name        = "jobportal-ng"
        Environment = "dev"
        ExtraTag    = "jobportal-app"
      }
    }
  }

  tags = local.tags
}
data "aws_instances" "eks_nodes" {

  filter {
    name   = "tag:kubernetes.io/cluster/${module.eks.cluster_name}"
    values = ["owned", "shared"]
  }

  filter {
    name   = "instance-state-name"
    values = ["running"]
  }

  depends_on = [module.eks]
}
